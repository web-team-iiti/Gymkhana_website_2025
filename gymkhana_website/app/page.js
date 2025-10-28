import Clubs from '@/components/Clubs'
import RadialMenu from '@/components/Councils'
import UpcomingEvents from '@/components/NewsEvents'
import React from 'react'

const page = () => {
  return (
    <div>
      <RadialMenu/>
      <Clubs/>
      <UpcomingEvents/>
    </div>
  )
}

export default page
