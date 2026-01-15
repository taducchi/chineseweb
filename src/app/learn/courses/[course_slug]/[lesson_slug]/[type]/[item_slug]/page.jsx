'use client';

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import VideoLesson from "../../../../../../components/learn/VideoLesson";
import ReadingLesson from "../../../../../../components/learn/ReadingLesson";
import FlashcardLesson from "../../../../../../components/learn/FlashcardLesson";
import DictationLesson from "../../../../../../components/learn/DictationLesson";


export default function LessonItemPage() {
  const params = useParams();
  const { course_slug, lesson_slug, item_slug, type } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log('Client - course_slug:', course_slug);
    console.log('Client - lesson_slug:', lesson_slug);
    console.log('Client - item_slug:', item_slug);
    console.log('Client - type:', type);
    
  },[]);
//     // Gọi API backend
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `/api/courses/${course_slug}/lessons/${lesson_slug}/items/${item_slug}?type=${type}`
//         );
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch lesson data');
//         }
        
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [course_slug, lesson_slug, item_slug, type]);
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }
  
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
  
  switch (type) {
    case "video":
      return <VideoLesson data={data} course_slug={course_slug} lesson_slug={lesson_slug} item_slug={item_slug} />
    case "reading":
      return <ReadingLesson data={data} />
        case "vocabulary":
                return <FlashcardLesson />
        case "dictation":
                return <DictationLesson />
    default:
      return <div>Lesson type not supported</div>
  }
}