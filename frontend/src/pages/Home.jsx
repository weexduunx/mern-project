import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'


const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)  
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:5555/books')
      .then(res => {
        setBooks(res.data.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className='p-4'>
        <div className="flex justify-between items-center">
            <h1 className='text-3xl my-8'>Liste des livres</h1>
            <link to="/books/create">
                <MdOutlineAddBox className='text-green-300 text-4xl' />
            </link>
        </div>
        {loading ? (
            <Spinner />
        ) : (
            <table className='w-full border-separate border-spacing-2'>
            
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'> N°</th>
                        <th className='border border-slate-600 rounded-md'> Titre</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                    </tr>
                </thead>
            </table>    
        )}
    </div>
  )
}

export default Home