'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../context/CourseContext';

/* ============================================================
   DATA
   ============================================================ */
const FILTER_TABS = [
	{ id: 'all', label: 'Tất cả' },
	{ id: 'hanzi', label: 'Hán tự' },
	{ id: 'pinyin', label: 'Pinyin' },
	{ id: 'sentence', label: 'Ngữ cảnh' },
	{ id: 'speed', label: 'Tốc độ' },
];

const GAMES = [
	{
		id: 'flashcard',
		category: 'hanzi',
		title: 'Flashcard 3D',
		difficulty: 'Cơ bản',
		time: '5 phút',
		xp: '+15 XP',
		primaryCta: true,
		thumbnail: '/images/practice/flashcard-game.jpg',
	},
	{
		id: 'multiple-choice',
		category: 'hanzi',
		title: 'Trắc nghiệm',
		difficulty: 'Cơ bản',
		time: '3 phút',
		xp: '+20 XP',
		thumbnail: '/images/practice/multiple-choice.jpg',
	},
	{
		id: 'matching',
		category: 'hanzi',
		title: 'Ghép thẻ',
		difficulty: 'Vừa',
		time: '4 phút',
		xp: '+25 XP',
		thumbnail: '/images/practice/matching.jpg',
	},

	{
		id: 'gap-filling',
		category: 'sentence',
		title: 'Điền từ',
		difficulty: 'Nâng cao',
		time: '5 phút',
		xp: '+30 XP',
		thumbnail: '/images/practice/gap-filling.jpg',
	},
	{
		id: 'word-dictation',
		category: 'pinyin',
		title: 'Nghe & Nhận diện',
		difficulty: 'Nghe',
		time: '4 phút',
		xp: '+25 XP',
		thumbnail: '/images/practice/listening.jpg',
	},
	{
		id: 'sentence-builder',
		category: 'sentence',
		title: 'Xếp câu',
		difficulty: 'Ngữ pháp',
		time: '6 phút',
		xp: '+35 XP',
		thumbnail: '/images/practice/sort.jpg',
	},
	
];

/* ============================================================
   GAME CARD
   ============================================================ */
function GameCard({ course_slug, module_slug, game, lesson_slug }) {
	return (
		<div className="flex flex-col rounded-xl fg-white p-4 border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all">
			<div className="relative h-36 rounded-lg bg-slate-100 overflow-hidden mb-3">
				{game.thumbnail ? (
					<Image
						src={game.thumbnail}
						alt={game.title}
						fill
						sizes="(max-width: 640px) 100vw, 25vw"
						className="object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-slate-400">
						<span className="material-symbols-outlined text-3xl">image</span>
					</div>
				)}
			</div>

			<h3 className="font-bold text-sm text-slate-900 mb-1">
				{game.title}
			</h3>

			<div className="flex items-center justify-between text-xs text-slate-500 mb-3">
				<span>{game.difficulty}</span>
				<span>{game.time}</span>
			</div>

			<div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
				<span className="text-xs font-bold text-amber-600">
					{game.xp}
				</span>
				<Link
					href={`/learn/courses/${course_slug}/${module_slug}/${game.id}/${lesson_slug}`}
					className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-white hover:bg-blue-600 transition-colors"
				>
					Bắt đầu
				</Link>
			</div>
		</div>
	);
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function PracticeSelect({ course_slug, module_slug, lesson_slug }) {
	const [activeFilter, setActiveFilter] = useState('all');

	const visibleGames =
		activeFilter === 'all'
			? GAMES
			: GAMES.filter((g) => g.category === activeFilter);

	const practiceHref = `/learn/courses/${course_slug}/${module_slug}/practice/${lesson_slug}`;

	const [lessonData, setLessonData] = useState({});
	const [nextLesson, setNextLesson] = useState({});
	const { API_URL } = useAuth();
	const accessToken = Cookies.get('access');
	const [loadingUpdate, setLoadingUpdate] = useState(false);
	const { courseData, setCourseData } = useCourse();



	return (
		<main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
			<div className="flex flex-col gap-10">
				{/* ============ HEADER ============ */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
					<div>
						<h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
							{lessonData.title || 'Luyện tập'}
						</h1>
						<p className="text-slate-500 text-sm">
							{lessonData.module_title || ''}
						</p>
					</div>

					<button
						onClick={() => {
							updateProgress(
								lessonData,
								setLessonData,
								nextLesson,
								setNextLesson,
								courseData,
								setCourseData,
								setLoadingUpdate,
								API_URL,
								lesson_slug
							);
						}}
						disabled={loadingUpdate || lessonData.is_completed}
						className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
							lessonData.is_completed
								? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
								: 'bg-primary hover:bg-blue-600 text-white'
						}`}
					>
						{loadingUpdate ? (
							<span className="material-symbols-outlined text-[20px] animate-spin">
								progress_activity
							</span>
						) : (
							<span className="material-symbols-outlined text-[20px]">
								check_circle
							</span>
						)}
						<span>
							{loadingUpdate
								? 'Đang lưu...'
								: lessonData.is_completed
								? 'Đã hoàn thành'
								: 'Đánh dấu hoàn thành'}
						</span>
					</button>
				</div>

				{/* ============ HERO ============ */}
				<section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-6 md:p-8">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
						<div className="flex-1 space-y-3">
							<h2 className="text-xl md:text-2xl font-bold">
								Luyện tập tổng hợp
							</h2>
							<p className="text-white/80 text-sm max-w-xl">
								Hệ thống tự động kết hợp các dạng bài tập theo thuật toán
								lặp lại ngắt quãng, giúp bạn ghi nhớ từ vựng hiệu quả hơn.
							</p>
						</div>

						<Link
							href={practiceHref}
							className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-indigo-50 transition-colors shrink-0"
						>
							<span className="material-symbols-outlined text-lg">
								play_arrow
							</span>
							Bắt đầu luyện tập
						</Link>
					</div>
				</section>

				{/* ============ GAMES GRID ============ */}
				<section className="space-y-5">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
						<h2 className="text-lg md:text-xl font-bold text-slate-900">
							Luyện tập tùy chỉnh
						</h2>

						<div className="flex items-center gap-2 overflow-x-auto pb-1">
							{FILTER_TABS.map((tab) => {
								const isActive = activeFilter === tab.id;
								return (
									<button
										key={tab.id}
										type="button"
										onClick={() => setActiveFilter(tab.id)}
										className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
											isActive
												? 'bg-primary text-white font-bold'
												: 'bg-slate-100 text-slate-600 hover:bg-slate-200'
										}`}
									>
										{tab.label}
									</button>
								);
							})}
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{visibleGames.map((game) => (
							<GameCard
								key={game.id}
								game={game}
								course_slug={course_slug}
								module_slug={module_slug}
								lesson_slug={lesson_slug}
							/>
						))}
					</div>
				</section>
			</div>
		</main>
	);
}