import axios from "axios";
import { store } from "../stores/stores";
import { toast } from "react-toastify";
import { router } from "../../app/layout/route/Routes";

const sleep = (delay: number) => new Promise(res => setTimeout(res, delay));

const baseURL = import.meta.env.VITE_API_URL;

// Helpful debug log – will show the resolved URL during build/runtime
if (import.meta.env.DEV) {
    console.log("Axios baseURL (DEV):", baseURL);
} else {
    console.log("Axios baseURL (PROD):", baseURL);
}

// Optional safety check
if (!baseURL) {
    console.warn("⚠️ VITE_API_URL is undefined! Check your .env.production file and rebuild.");
}

const agent = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
});

agent.interceptors.response.use(
    async response => {
        if (import.meta.env.DEV) await sleep(500);
        store.uiStore.isIdle();
        return response;
    },
    async error => {
        if (import.meta.env.DEV) await sleep(500);
        store.uiStore.isIdle();
        const { status, data } = error.response || {};
        switch (status) {
            case 400:
                if (data?.errors) {
                    const modalStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) modalStateErrors.push(data.errors[key]);
                    }
                    throw modalStateErrors.flat();
                } else toast.error(data);
                break;
            case 401:
                if (data.detail === 'NotAllowed') {
                    throw new Error(data.detail)
                } else {
                    toast.error('Unauthorized');
                }
                break;
            case 404:
                router.navigate('/not-found');
                break;
            case 500:
                router.navigate('/server-error', { state: { error: data } });
                break;
        }
        return Promise.reject(error);
    }
);

export default agent;
