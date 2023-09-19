"use client"
import Image from 'next/image'
import ImageTrack from '../components/image-track'
import Navbar from '../components/navbar'

export default function Home() {
  return (
    <div>
      <Navbar />
      <ImageTrack></ImageTrack> 
    </div>
  )
}