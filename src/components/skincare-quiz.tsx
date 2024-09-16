'use client'

import { Button } from "@/components/ui/button"
import Link
 from "next/link"
import Image from "next/image"
export function MainPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #C779D0, #FEAC5E)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '20px'
        }}>
          SOMETHING ABOUT YOUR SKIN
        </h1>
        <p style={{
          fontSize: '24px',
          color: 'white',
          marginBottom: '30px'
        }}>
          Find your personalized basic<br />skincare routine in 2 minutes
        </p>
        <Link href="/quiz" passHref>
        <button style={{
          backgroundColor: 'white',
          color: 'black',
          padding: '12px 24px',
          fontSize: '18px',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer'
        }}>
    Take the quiz!
      </button>
    </Link>
        </div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        width: '300px',
        height: '300px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.5)'
      }}>
        <Image
          src="/products.webp?height=500&width=500"
          alt="Skincare products illustration"
          width={500}
          height={500}
          style={{
            objectFit: 'contain'
          }}
          />
      </div>
    </div>
  )
}