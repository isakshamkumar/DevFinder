import React from 'react'

type Props = {}

const layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <div
        className='fixed top-88 inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl '
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(30%)] aspect-[1155/678] w-[60rem] h-[30] top-[-10rem] rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
      <div className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8'>
        {children}
      </div>
    </>
  )
}

export default layout
