function registerServiceWorker(filename:string, updateCallback:(sw:ServiceWorker)=>void) {
    if( !("serviceWorker" in navigator) ) {
        console.warn("Browser does not support Service WOrkers!");
        return;
    }

    navigator.serviceWorker.register(filename).then((serviceWorker)=>{
        if(!navigator.serviceWorker.controller)
            return;

        if(serviceWorker.waiting) {
            updateCallback(serviceWorker.waiting);

        } else if(serviceWorker.installing) {
            serviceWorker.addEventListener("statechange", ()=>{
                if (serviceWorker.installing?.state === "installed") {
                    updateCallback(serviceWorker.installing)
                }
            });

        } else {
            serviceWorker.addEventListener("updatefound", ()=>{
                const newServiceWorker = serviceWorker.installing!;

                newServiceWorker.addEventListener("statechange", ()=>{
                    if (newServiceWorker.state === "installed") {
                        updateCallback(newServiceWorker)
                    }
                });
            });
        }
    });
    
    navigator.serviceWorker.addEventListener('controllerchange', ()=>{
        window.location.reload();
    });
}

export async function loadServiceWorker(filename:string):Promise<ServiceWorker|null> {
    registerServiceWorker(filename, (serviceWorker)=>{
        if(window.confirm("An update is available!\nRefresh to download update?")) {
            serviceWorker.postMessage({update:true});
        }
    });

    return new Promise((resolve, reject)=>{
        if( !("serviceWorker" in navigator) ) {
            return resolve(null);
        }

        navigator.serviceWorker.ready.then(()=>{
            resolve(navigator.serviceWorker.controller)
        }).catch(reject);
    });
}