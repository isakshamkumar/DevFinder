// import { CreateRoomForm } from '@/components/Forms/CreateRoomForm'
import CreateRoomForm from '@/components/Forms/CreateRoomForm'
import { AnimatedInput } from '@/components/ui/AnimatedInput'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <h2>
      {/* h2 */}
{/* <AnimatedInput placeholder='dfnknldn'/> */}
<CreateRoomForm/>
    </h2>

  )
}

export default page