import Button from './button';

const components = {
    dtButton: Button
};

const iview = {
    ...components
};

const install = function(Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(iview).forEach(key => {
        Vue.component(key, iview[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, 
    install
};
  
export default API;   
