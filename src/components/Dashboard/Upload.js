import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();

    const videoHandler = (e)=>{
        setVideo(e.target.files[0])
    }

    const thumbnailHandler = (e)=>{
        setThumbnail(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        //console.log(title,description,tags,category,video,thumbnail)
        setLoading(true)
        const formData = new FormData()
        formData.append('title',title)
        formData.append('description',description)
        formData.append('category',category)
        formData.append('tags',tags)
        formData.append('video',video)
        formData.append('thumbnail',thumbnail)

        axios.post('https://youtubeapi-p9h2.onrender.com/video/upload',formData,{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('token')
            }
        })
        .then(res=>{
            setLoading(false)
            console.log(res.data)
            toast("Video is uploaded..")
            navigate('/dashboard/my-videos')
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
            toast.error(err.response.data.error)
        })
    }
  
    return (
    <div className='upload-container'>
        <h2>Upload Video</h2>
        <form onSubmit={submitHandler} className='upload-form'>
            <input onChange={(e)=>{setTitle(e.target.value)}} placeholder='Title'/>
            <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder='Description'></textarea>
            <select onChange={(e)=>{setCategory(e.target.value)}}>
                <option>Select Category</option>
                <option value='education'>Education</option>
                <option value='entertainment'>Entertainment</option>
                <option value='music'>Music</option>
                <option value='science'>Science</option>
                <option value='technology'>Technology</option>
            </select>
            <textarea onChange={(e)=>{setTags(e.target.value)}} placeholder='Tags'></textarea>
            <label>Select Video</label>
            <input onChange={videoHandler} type='file'/>

            <label>Thumbnail</label>
            <input onChange={thumbnailHandler} type='file'/>
            {imageUrl && <img className='thumbnail' alt='thumbnail' src={imageUrl}/>}
            <button type='submit'>{isLoading && <i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i>} Upload</button>
        </form>
    </div>
  )
}

export default Upload