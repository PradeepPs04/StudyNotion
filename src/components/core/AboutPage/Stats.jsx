import React from 'react'

const stats = [
    {count: '5k', label: 'Active students'},
    {count: '10+', label: 'Mentors'},
    {count: '200+', label: 'Courses'},
    {count: '50+', label: 'Awards'},
]

export const Stats = () => {
  return (
    <section>
        <div className='flex justify-evenly'>
        {
            stats.map((data, idx) => (
                <div key={idx} className='flex flex-col items-center'>
                    <h2>{data.count}</h2>
                    <p>{data.label}</p>
                </div>
            ))   
        }
        </div>
    </section>
  )
}
