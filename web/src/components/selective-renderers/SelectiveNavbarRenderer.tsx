import Navbar from 'layouts/Navbar'
import React from 'react'
import { useLocation } from 'react-router-dom'

type Props = {}

const SelectiveNavbarRenderer = (props: Props) => {

    const addSlashesToRoute = (route:string) => {
        return [`/${route}`, `/${route}/`]
    }


        let blackList = ['/login', '/sign-up', '/login/', '/sign-up/', '/forgot-password','/forgot-password/'];
        let location = useLocation();
    
        const checkLike = (url:string) =>{
            let like = [...addSlashesToRoute('login'),
            ...addSlashesToRoute('mechanics/register'),
            ...addSlashesToRoute('register'),
            ...addSlashesToRoute('faq'),
            ...addSlashesToRoute('about'),
            ...addSlashesToRoute('services'),
            ...addSlashesToRoute('services'),
            ...addSlashesToRoute('terms'),
            ...addSlashesToRoute('privacy-policy'),
            ...addSlashesToRoute('book-appointment'),
        ]
            let contains = false
            like.forEach(urlString => {
    
                if(url.includes(urlString)) contains = true
            })
        
            return contains
        }
    
    
        return blackList.includes(location.pathname) || checkLike(location.pathname) || location.pathname==="/" ? (<></>)  : (<Navbar />);
        
   
}

export default SelectiveNavbarRenderer