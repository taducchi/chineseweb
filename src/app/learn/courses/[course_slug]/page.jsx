// app/page.js
'use client';
import React from 'react';
import CourseIntro from "../../../components/learn/CourseIntro";
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Cookies from 'js-cookie';
import { useCourse } from '../../../context/CourseContext';


export default function HomePage({ params }) {
        const unwrappedParams = React.use(params);
        const course_slug = unwrappedParams?.course_slug;
        // const [Loading, setLoading] = useState(false)
        const API_URL = useAuth().API_URL
      
        const {courseData, setCourseData} = useCourse()
      
        return (

                
                <CourseIntro course_slug={course_slug} courseData={courseData}  />
                

        );
}