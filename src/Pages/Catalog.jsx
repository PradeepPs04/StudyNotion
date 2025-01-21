import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Footer from '../components/common/Footer';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCategoryPageData } from '../services/operations/pageAndComponentData';
import { CourseSlider } from '../components/core/Catalog/CourseSlider';
import { CourseCard } from '../components/core/Catalog/CourseCard';

export const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState([]);
    const [categoryId, setCategoryId] = useState(null);

    // fetch all categories
    useEffect(() => {
        const getCategoryId = async () => {
            const response = await apiConnector("GET", categories.CATEGORIES_API);
            const categoryId = response?.data?.data.filter((category) => category.name.split(" ").join("-").toLowerCase() === catalogName)[0]?._id;

            setCategoryId(categoryId);
        }

        getCategoryId();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            const response = await getCategoryPageData(categoryId);
            setCatalogPageData(response);
        }

        if(categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);

  return (
    <div className='text-richblack-5'>
        
        <div>
            <p>{`Home / Catalog / `}
                <span>{catalogPageData?.data?.selectedCategory?.name}</span>
            </p>
            <p>{catalogPageData?.data?.selectedCategory?.name}</p>
            <p>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* section-1 */}
            <div>
                <div>Courses to get you started</div>
                <div className='flex gap-x-3'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>

                <div>
                    <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>

            {/* section-2 */}
            <div>
                <div>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</div>
                <p>Top Courses</p>
                <div>
                    <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses}/>
                </div>
            </div>

            {/* section-3 */}
            <div>
                <div>Frequently Bought</div>
                <div className='py-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                    {
                        catalogPageData?.data?.mostSellingCourses.slice(0,4).map((course) => (
                            <CourseCard course={course} Height={"h-[400px]"} key={course._id}/>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}
