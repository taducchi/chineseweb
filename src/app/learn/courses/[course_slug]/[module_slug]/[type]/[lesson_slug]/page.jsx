'use client';

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ReadingLesson from "../../../../../../components/learn/ReadingLesson";
import FlashcardLesson from "../../../../../../components/learn/FlashcardLesson";
import DictationLesson from "../../../../../../components/learn/DictationLesson";
import VideoLesson from "../../../../../../components/learn/VideoLesson";
import PracticeLesson from "../../../../../../components/learn/PracticeLesson";
import PracticeSelect from "../../../../../../components/learn/PracticeSelect";
import { useCourse } from "../../../../../../context/CourseContext";
import { useAuth } from "../../../../../../context/AuthContext";
import Cookies from 'js-cookie'
import IntroLesson from "../../../../../../components/learn/IntroLesson";
import SummaryLesson from "../../../../../../components/learn/SummaryLesson";
import MatchingGame from "../../../../../../components/learn/MatchingGame";
import WordDictation from "../../../../../../components/learn/WordDictation";
import GapFilling from "../../../../../../components/learn/GapFilling";
import MultipleChoice from "../../../../../../components/learn/MultiplceChoice";
import SentenceBuild from "../../../../../../components/learn/SentenceBuild";

export default function LessonItemPage() {
  const params = useParams();
  const { course_slug, lesson_slug, module_slug, type } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {courseData, setCourseData} = useCourse()
  const {API_URL} = useAuth();
  const accessToken = Cookies.get('access')
 


  switch (type) {
    case "video":
      return <VideoLesson data={data} course_slug={course_slug} module_slug={module_slug} 
      lesson_slug={lesson_slug}
     
      
      />
    case "reading":
      return <ReadingLesson data={data} course_slug={course_slug} module_slug={module_slug} 
      lesson_slug={lesson_slug}
      />
    case "flashcard":
      return <FlashcardLesson data={data} course_slug={course_slug} module_slug={module_slug} lesson_slug={lesson_slug}  />
    case "dictation":
      return <DictationLesson />
    case "practice":
      return <PracticeLesson data={data} course_slug={course_slug} module_slug={module_slug} 
      lesson_slug={lesson_slug}
     />
    case "vocabulary":
      return <PracticeSelect course_slug={course_slug} module_slug={module_slug} lesson_slug={lesson_slug}  />
    case "introduction":
      return <IntroLesson course_slug={course_slug} module_slug={module_slug} lesson_slug={lesson_slug}  />
       case "matching":
      return <MatchingGame course_slug={course_slug} module_slug={module_slug} lesson_slug={lesson_slug}  />
    case "summary":
      return <SummaryLesson course_slug={course_slug} module_slug={module_slug} lesson_slug={lesson_slug}  />
    case "word-dictation":
      return <WordDictation course_slug={course_slug} module_slug={module_slug} lesson_slug={lesson_slug}  />
    case "gap-filling":
      return <GapFilling course_slug={course_slug} module_slug={module_slug} lesson_slug={lesson_slug}  />
    case "multiple-choice":
      return <MultipleChoice course_slug={course_slug} module_slug={module_slug} lesson_slug={lesson_slug}  />
    case "sentence-builder":
      return <SentenceBuild course_slug={course_slug} module_slug={module_slug} lesson_slug={lesson_slug}  />
    
      default:
      return <div>Lesson type not supported</div>
  }
}