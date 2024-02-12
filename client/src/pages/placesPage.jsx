import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../perks";
import axios from "axios";


export default function PlacesPage() {
    const { action } = useParams();
    const [title ,setTitle]=useState('')
    const [address,setAddress]=useState('')
    const [addedPhoto,setAddedPhoto]=useState([])
    const [photoLink,setPhotoLink]=useState('')
    const [description,setDescription]=useState('')
    const [perks,setPerks]=useState('')
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [maxGuests ,setMaxGuests]=useState(1)
    
    function inputHeaders(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        )

    }
    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )

    }
    function preInput(header,description){
        return(
            <>
             {inputHeaders(header)}
             {inputDescription(description)}
            </>
           

        )
    }
    async function addPhotoByLink(e){
         e.preventDefault()
    const {data :filename}= await axios.post('/upload-by-Link',{link : photoLink})
    console.log(filename)
    setAddedPhoto(prev=> {
        return [ ...prev , filename];

    })
    setPhotoLink('')
} 
function uploadPhoto(e){
    
    // e.preventDefault()
    const files =e.target.files
    const data =new FormData()
    for(let i=0;i<files.length;i++){
    data.append("photos",files[i])
    }
     axios.post('/upload',data,
    {
        headers:{'Content-Type':'multipart/form-data'}
    }).then(response =>{
        const {data:filenames}=response
        setAddedPhoto(prev=> {
            return [ ...prev , filenames];
    
        })
        
    })
}
    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                        to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add new Place</Link>
                </div>)}
            {
                action === 'new' && (
                    <div>
                        <form>
                            {preInput('Title','Title for your plce.shouldbe short and catchyas in adverisement ')}
                            <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" />
                            {preInput('Address','Address to your place')}
                            <input type="text" value={address} onChange={e=>setAddress(e.target.value)}  placeholder="address" />
                            {preInput('Photos','more=better')}
    
                            <div className="flex gap-2">
                                <input type='text' value={photoLink} onChange={e=>setPhotoLink(e.target.value)} placeholder={'Add using a link ...jpg'} />
                                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo </button>
                            </div>
                             <div className="grid mt-2 gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhoto.length > 0 && addedPhoto.map(link =>(
                                <div key={link}>
                                 <img className="rounded-2xl" src={'http://localhost:3000/uploads/'+link} alt="D:\airbnb\api\uploads\download.jpg" />
                                </div>
                            ))}
                            <label className="cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                    <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                    </svg>
                                    Upload</label>
                                </div>
                                {preInput('Description','description of the place')}
                                
                            <textarea  value={description} onChange={e=>setDescription(e.target.value)}/>
                           {preInput('Perks','select at the perks of your place')}
                                <div className="grid mt-2 gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                                        
                            </div>
                            {preInput('Extra Info','House Rules etc')}
                            <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)}/>
                            {preInput('Check In&Out times','Add check in and out times, rememeber to have some time window for cleaning the room between guests ')}
                        
                            <div className=" grid gap-2 grid-cols-2 md:grid-cols-4">
                                <div>
                                <h3 className="mt-2 -mb-2">Check in time</h3>
                                <input type="text" value={checkIn} onChange={e=>setCheckIn(e.target.value)} placeholder="14"/>
                                </div>
                                <div>
                                <h3 className="mt-2 -mb-2">Check Out time</h3>
                                <input type="text" value={checkOut}  onChange={e=>setCheckOut(e.target.value)} placeholder="11"/>
                                </div>
                                <div>
                                <h3 className="mt-2 mb-2">Max No. of guests</h3>
                                <input type="number" value={maxGuests} onChange={e=>setMaxGuests(e.target.value)} placeholder="01-00"/>
                                </div>   
                            </div>
                            <button className="primary my-4">Save</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}