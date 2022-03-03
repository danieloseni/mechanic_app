import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {store} from  'redux/store';

export type ApiClientSuccessFunction = (response: AxiosResponse) => void
export type ApiClientErrorFunction = (response: AxiosResponse) => void
export type ApiClientTimeoutFunction = () => void

export default class AxiosClient{
    
    axiosInstance:AxiosInstance

    constructor(private url:string, private onSuccess:ApiClientSuccessFunction, private onError:ApiClientErrorFunction, private onTimeout:ApiClientTimeoutFunction, private authenticatedRequest = false){
       
        this.axiosInstance = axios.create()
    }

    setUp(){
        console.log(this.url)
        this.axiosInstance.interceptors.request.use(config => {
            if(this.authenticatedRequest){
                config.headers!.Authorization = "Bearer " + store.getState().user.token
            }
            //config.headers!['Content-Type'] = "multipart/form-data"
            //config.headers!['Content-Type'] = "application/json"
    
            config.baseURL = process.env.PROXY || "http://localhost:5000"
            //TODO: Implement what to happen before request is sent
            return config;
        },
        error => {
            //TODO: IMplement what to happen if there is any error
           
        }
        );
    
        this.axiosInstance.interceptors.response.use(
            response => {
                if(response){
                    localStorage.setItem('redirectpath', "")
                    //alert('successful')
                    this.onSuccess(response);
    
                }
    
            },
    
            error => {
                if(error.response){
                    if(error.response.status === 401 && this.authenticatedRequest){
                        // if(localStorage.getItem('redirectpath') !== "") return
                        localStorage.setItem('loggedin', "")
                       window.location.href = "/login?return_to="+window.location.pathname
                    }else{
                        this.onError(error);
                    }
                }
                
            }
        )
    }
    
    toFormData(json:any){
        var formData = new FormData()

        for(let i = 0; i < Object.keys(json).length; i++){
            //While appending, check if the value of the current key is an array. If it is, loop through the value and append each individual element to the form data with the same key. This will create an array in the form data

            if(Array.isArray( json[Object.keys(json)[i]])){
                json[Object.keys(json)[i]].forEach((data:any) => {
                    
                    formData.append(Object.keys(json)[i], data)
                })
            }else{
                formData.append(Object.keys(json)[i], json[Object.keys(json)[i]])

            }
           
            
        }


        return formData;
    }
    
    get(){
        if(!this.url){
            return
        }
        this.setUp()
        new Promise((resolve, reject) => {
            if(document.readyState !== 'complete'){
                window.addEventListener('load', () => {
                   
    
                    this.axiosInstance.get(this.url);
    
                })
            }else{
                this.axiosInstance.get(this.url);

            }
            
        })
    }

    downloadMedia(onDownloadProgress = (event:any) => {}){
        if(!this.url){
            return
        }
        this.setUp()

        new Promise((resolve, reject) => {
            if(document.readyState !== 'complete'){
                window.addEventListener('load', () => {
    
                    this.axiosInstance.get(this.url, {
                        headers: {
                            
                        },
                        onDownloadProgress,
                        responseType: 'blob'
                    })
    
                })
            }else{
                this.axiosInstance.get(this.url, {
                    headers: {
                        
                    },
                    onDownloadProgress,
                    responseType: 'blob'
                })

            }
            
        })
       
    }
    
    post<T = any>(data:T, onUploadProgress = (event:any) => {}){
        this.setUp();


        const config = {
            onUploadProgress
        }

        this.axiosInstance.post(this.url, this.toFormData(data), config)
    }

    postWithoutConversion<T = any>(data:T, onUploadProgress = (event:any) => {}){
        this.setUp();
        const config = {
            onUploadProgress
        }
        this.axiosInstance.post(this.url, data, config)
    }

    head = () => {
        if(!this.url){
            console.log("emptyty")
        }
        this.setUp();
        
        this.axiosInstance.head(this.url)
    }

    
    
}