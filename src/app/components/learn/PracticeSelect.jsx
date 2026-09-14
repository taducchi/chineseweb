'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/* ============================================================
   DATA
   ============================================================ */
const STATS = [
	{
		icon: 'target',
		iconColor: 'text-primary',
		iconBg: 'bg-primary/10',
		value: '20 Từ',
		label: 'Cần củng cố hôm nay',
		hoverBorder: 'hover:border-primary/30',
	},
	{
		icon: 'local_fire_department',
		iconColor: 'text-tertiary',
		iconBg: 'bg-tertiary-container',
		value: '5 Ngày liên tiếp',
		label: 'Duy trì streak phong độ',
		hoverBorder: 'hover:border-tertiary/30',
	},
	{
		icon: 'rewarded_ads',
		iconColor: 'text-secondary',
		iconBg: 'bg-secondary-container',
		value: '+120 XP',
		label: 'Thưởng tích lũy bài này',
		hoverBorder: 'hover:border-secondary/30',
	},
];

const FILTER_TABS = [
	{ id: 'all', label: 'Tất cả (8)' },
	{ id: 'hanzi', label: 'Nhớ nghĩa & Hán tự' },
	{ id: 'pinyin', label: 'Luyện Pinyin & Âm thanh' },
	{ id: 'sentence', label: 'Ghép câu & Ngữ cảnh' },
	{ id: 'speed', label: 'Thử thách tốc độ' },
];

const GAMES = [
	{
		id: 'flashcard-3d',
		category: 'hanzi',
		title: 'Flashcard 3D',
		difficulty: '⭐ Cơ bản',
		difficultyColor: 'text-tertiary',
		description:
			'Lật thẻ ghi nhớ Hán tự, Pinyin, nghĩa & ví dụ thực tế. Đánh giá từ nhớ / chưa nhớ để lập lịch ôn tự động.',
		time: '5 phút',
		xp: '+15 XP',
		primaryCta: true,
		thumbnail: '/images/practice/flashcard.png',
	},
	{
		id: 'multiple-choice',
		category: 'hanzi',
		title: 'Trắc nghiệm 4 đáp án',
		difficulty: '⭐ Cơ bản',
		difficultyColor: 'text-tertiary',
		description:
			'Phản xạ nhanh chọn nghĩa đúng hoặc chọn Hán tự tương ứng. Tự động sinh đáp án nhiễu thông minh.',
		time: '3 phút',
		xp: '+20 XP',
		primaryCta: false,
		thumbnail: '/images/practice/multiple-choice.png',
	},
	{
		id: 'matching',
		category: 'hanzi',
		title: 'Ghép thẻ tương ứng',
		difficulty: '⭐⭐ Vừa',
		difficultyColor: 'text-tertiary',
		description:
			'Nối nhanh các cặp thẻ đồng nghĩa, Hán tự ⇄ Pinyin hoặc Pinyin ⇄ Nghĩa tiếng Việt để dọn sạch bàn cờ.',
		time: '4 phút',
		xp: '+25 XP',
		primaryCta: false,
		thumbnail: '/images/practice/matching.png',
	},
	{
		id: 'pinyin-tone',
		category: 'pinyin',
		title: 'Pinyin & Thanh điệu',
		difficulty: '⭐ Cơ bản',
		difficultyColor: 'text-tertiary',
		description:
			'Tone Challenge - Phân biệt thanh điệu chuẩn xác, chống nhầm lẫn thanh 1, 2, 3, 4 trong phát âm tiếng Trung.',
		time: '3 phút',
		xp: '+20 XP',
		primaryCta: false,
		thumbnail: '/images/practice/pinyin-tone.png',
	},
	{
		id: 'fill-blank',
		category: 'sentence',
		title: 'Điền từ ngữ cảnh',
		difficulty: '⭐⭐ Nâng cao',
		difficultyColor: 'text-tertiary',
		description:
			'Sử dụng trực tiếp câu ví dụ mẫu. Học cách dùng từ chuẩn xác trong câu giao tiếp và văn cảnh đời thường.',
		time: '5 phút',
		xp: '+30 XP',
		primaryCta: false,
		thumbnail: '/images/practice/fill-blank.png',
	},
	{
		id: 'listening',
		category: 'pinyin',
		title: 'Nghe & Nhận diện',
		difficulty: '⭐⭐ Kỹ năng nghe',
		difficultyColor: 'text-tertiary',
		description:
			'Luyện tai nghe phát âm chuẩn bản xứ, nhận diện ngay mặt chữ Hán tương ứng mà không cần nhìn Pinyin trước.',
		time: '4 phút',
		xp: '+25 XP',
		primaryCta: false,
		thumbnail: '/images/practice/listening.png',
	},
	{
		id: 'sentence-builder',
		category: 'sentence',
		title: 'Xếp câu hoàn chỉnh',
		difficulty: '⭐⭐⭐ Ngữ pháp',
		difficultyColor: 'text-tertiary',
		description:
			'Sentence builder - Kéo thả các từ để ghép thành câu đúng trật tự. Nắm vững trật tự từ và ngữ pháp Hán ngữ.',
		time: '6 phút',
		xp: '+35 XP',
		primaryCta: false,
		thumbnail: '/images/practice/sentence-builder.png',
	},
	{
		id: 'speed-quiz',
		category: 'speed',
		title: 'Đua tốc độ',
		difficulty: '⭐⭐ Kịch tính',
		difficultyColor: 'text-error',
		description:
			'Speed Quiz - Trả lời 20 câu trong thời gian giới hạn 5-10s mỗi câu. Rèn phản xạ tức thì, tranh cúp bảng xếp hạng.',
		time: '2 phút',
		xp: '+40 XP',
		primaryCta: true,
		thumbnail: '/images/practice/speed-quiz.png',
	},
];

/* ============================================================
   ICON HELPER
   ============================================================ */
function Icon({ name, className = '', filled = false, style = {} }) {
	return (
		<span
			className={`material-symbols-outlined ${className}`}
			style={{
				fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
				...style,
			}}
		>
			{name}
		</span>
	);
}

/* ============================================================
   PREVIEW COMPONENT (dùng chung cho tất cả game)
   ============================================================ */
function Preview({ src, alt }) {
	return (
		<div className="relative h-40 sm:h-44 rounded-xl bg-surface-container-low overflow-hidden border border-outline-variant/40 shadow-inner group-hover:bg-primary-container/30 transition-colors">
			{src ? (
				<Image
					src={src}
					alt={alt}
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			) : (
				<div className="w-full h-full flex items-center justify-center text-on-surface-variant">
					<Icon name="image" className="text-3xl opacity-40" />
				</div>
			)}
		</div>
	);
}

/* ============================================================
   GAME CARD
   ============================================================ */
function GameCard({ course_slug, module_slug, lesson_slug, game }) {
	return (
		<div className="flex flex-col justify-between rounded-2xl bg-white p-4 sm:p-5 border border-outline-variant/70 shadow-xs hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 group">
			<div className="space-y-3 sm:space-y-4">
				<Preview src={game.thumbnail} alt={game.title} />
				<div className="space-y-1.5">
					<div className="flex items-center justify-between gap-1">
						<h3 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface group-hover:text-primary transition-colors">
							{game.title}
						</h3>
						<span
							className={`${game.difficultyColor} text-[10px] sm:text-xs font-semibold shrink-0`}
						>
							{game.difficulty}
						</span>
					</div>
					<p className="font-body-md text-[11px] sm:text-xs text-on-surface-variant leading-relaxed line-clamp-2">
						{game.description}
					</p>
				</div>
			</div>

			<div className="pt-3 sm:pt-4 space-y-3 border-t border-outline-variant/40 mt-3 sm:mt-4">
				<div className="flex items-center justify-between text-[10px] sm:text-xs text-on-surface-variant font-medium">
					<span className="flex items-center gap-1">
						<Icon name="schedule" className="text-xs sm:text-sm" /> {game.time}
					</span>
					<span className="flex items-center gap-1 text-secondary font-bold">
						<Icon name="bolt" className="text-xs sm:text-sm" /> {game.xp}
					</span>
				</div>
				<Link
					href={`/learn/courses/${course_slug}/${module_slug}/${game.id}`}
					className={`block w-full py-2.5 px-4 rounded-xl font-label-md text-xs font-bold text-center transition-all duration-150 active:scale-[0.98] ${
						game.primaryCta
							? 'bg-gradient-to-r from-primary to-indigo-600 text-white hover:to-primary-hover shadow-xs'
							: 'bg-surface-container-low text-primary hover:bg-primary hover:text-white border border-outline-variant/50'
					}`}
				>
					{game.id === 'speed-quiz' ? 'Vào đấu trường' : 'Bắt đầu'}
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

	return (
		<main className="relative z-10 w-full flex flex-col justify-start max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 overflow-y-auto">
			{/* Ambient Glow */}
			<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
				<div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[350px] sm:h-[450px] bg-primary/10 blur-[130px] rounded-full" />
				<div className="absolute top-96 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-secondary/10 blur-[120px] rounded-full" />
				<div className="absolute bottom-20 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-primary/10 blur-[120px] rounded-full" />
				<div className="absolute inset-0 bg-[radial-gradient(#d4d1e8_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
			</div>

			<div className="flex flex-col w-full space-y-8 sm:space-y-10">
				{/* ============ SECTION 1: SMART REVIEW HERO ============ */}
				<section className="space-y-4">
					<div className="flex flex-wrap items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<Icon name="stars" filled className="text-primary text-xl" />
							<h2 className="font-headline-md text-base sm:text-lg md:text-xl font-bold tracking-wider text-primary uppercase">
								Luyện tập tổng hợp — Khuyên dùng
							</h2>
						</div>
						<span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
							<span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
							Hiệu quả ghi nhớ x3
						</span>
					</div>

					<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a1768] via-[#3a209e] to-[#5b46f6] text-white p-5 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-primary/40">
						<div className="pointer-events-none absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-indigo-400/20 blur-3xl" />
						<div className="pointer-events-none absolute bottom-0 right-1/3 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-emerald-400/10 blur-3xl" />
						<div className="pointer-events-none absolute -bottom-20 -left-20 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-purple-500/25 blur-2xl" />

						<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
							<div className="lg:col-span-7 space-y-4 sm:space-y-5">
								<div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
									<span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold tracking-wide border border-white/25">
										<Icon
											name="auto_awesome"
											filled
											className="text-xs sm:text-sm text-yellow-300"
										/>
										AI ADAPTIVE
									</span>
									<span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/25 text-emerald-200 border border-emerald-400/30 text-[10px] sm:text-xs font-semibold">
										Đề xuất cho bạn
									</span>
									<span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15 text-xs font-medium">
										Xoay vòng 8 dạng bài
									</span>
									<span className="px-2.5 sm:px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[10px] sm:text-xs font-bold">
										⭐⭐⭐ Toàn diện
									</span>
								</div>

								<div className="space-y-2">
									<h3 className="font-headline-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
										Chế độ Luyện tập Tổng hợp Toàn diện
										<span className="block text-indigo-200 text-base sm:text-lg md:text-xl font-semibold mt-1">
											Smart Master Review
										</span>
									</h3>
									<p className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-body-md">
										Hệ thống tự động kết hợp linh hoạt các hình thức (Flashcard,
										Trắc nghiệm, Điền từ, Nghe, Xếp câu, Đua tốc độ) theo thuật
										toán lặp lại ngắt quãng (
										<span className="text-white font-medium underline decoration-indigo-300">
											Spaced Repetition
										</span>
										). Tự động thích ứng, đào sâu và lặp lại chính xác những từ
										vựng bạn còn lúng túng.
									</p>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
									{[
										'Nhớ mặt chữ & Pinyin',
										'Phản xạ nghe - nói chuẩn',
										'Ứng dụng câu tức thì',
									].map((b) => (
										<div
											key={b}
											className="flex items-center gap-2 text-[11px] sm:text-sm text-indigo-100"
										>
											<Icon
												name="verified"
												className="text-emerald-400 text-sm sm:text-base"
											/>
											<span>{b}</span>
										</div>
									))}
								</div>
							</div>

							<div className="lg:col-span-5 flex flex-col space-y-3 sm:space-y-4">
								<div className="rounded-xl bg-white/10 backdrop-blur-md p-4 sm:p-5 border border-white/20 shadow-inner flex flex-col space-y-3 sm:space-y-4">
									<div className="flex items-center justify-between border-b border-white/15 pb-2.5 sm:pb-3">
										<div className="flex items-center gap-2">
											<span className="flex h-3 w-3 relative">
												<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
												<span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
											</span>
											<span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-200">
												Chu trình 4 chặng AI
											</span>
										</div>
										<span className="text-[10px] sm:text-xs font-medium text-white/70">
											HSK 1-2 Adaptive
										</span>
									</div>

									<div className="space-y-2">
										<div className="text-[10px] sm:text-xs text-white/90 font-medium">
											Quy trình rèn luyện đa giác quan:
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center">
											{[
												{
													icon: 'visibility',
													color: 'text-yellow-300',
													label: 'Nhận diện',
												},
												{
													icon: 'hearing',
													color: 'text-cyan-300',
													label: 'Nghe hiểu',
												},
												{
													icon: 'translate',
													color: 'text-emerald-300',
													label: 'Ngữ cảnh',
												},
												{
													icon: 'bolt',
													color: 'text-pink-300',
													label: 'Phản xạ tốc độ',
												},
											].map((item) => (
												<div
													key={item.label}
													className="p-2 rounded-lg bg-white/15 border border-white/20 flex flex-col items-center gap-1"
												>
													<Icon
														name={item.icon}
														className={`text-sm sm:text-base ${item.color}`}
													/>
													<span className="text-[9px] sm:text-[11px] font-semibold text-white leading-tight">
														{item.label}
													</span>
												</div>
											))}
										</div>
									</div>

									<div className="flex items-center justify-between pt-1 text-[10px] sm:text-xs text-indigo-100 gap-2">
										<span className="inline-flex items-center gap-1">
											<Icon name="quiz" className="text-xs sm:text-sm" />
											<span className="hidden sm:inline">
												20 câu hỏi tổng hợp
											</span>
											<span className="sm:hidden">20 câu</span>
										</span>
										<span className="inline-flex items-center gap-1">
											<Icon name="schedule" className="text-xs sm:text-sm" />
											8 - 10 phút
										</span>
										<span className="inline-flex items-center gap-1 font-bold text-amber-300">
											<Icon name="stars" className="text-xs sm:text-sm" />
											+50 XP
										</span>
									</div>
								</div>

								<Link
									href={practiceHref}
									className="w-full group inline-flex items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl bg-white text-primary font-headline-md text-sm sm:text-base lg:text-lg font-bold shadow-lg hover:bg-indigo-50 hover:shadow-2xl active:scale-[0.99] transition-all duration-200"
								>
									<span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white group-hover:scale-110 transition-transform">
										<Icon name="play_arrow" filled className="text-lg sm:text-xl" />
									</span>
									<span>Bắt đầu luyện tập ngay</span>
									<Icon
										name="arrow_forward"
										className="text-base sm:text-lg transition-transform group-hover:translate-x-1"
									/>
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* ============ SECTION 2: CUSTOM GAMES GRID ============ */}
				<section className="space-y-5 sm:space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-outline-variant/60 pb-4">
						<div className="space-y-1">
							<div className="flex items-center gap-2">
								<span className="text-lg sm:text-xl">🎯</span>
								<h2 className="font-headline-md text-lg sm:text-xl md:text-2xl font-bold text-on-surface tracking-tight">
									Luyện tập tùy chỉnh
								</h2>
							</div>
							<p className="font-body-md text-xs sm:text-sm md:text-base text-on-surface-variant">
								Tự do chọn riêng từng dạng bài theo kỹ năng bạn muốn nâng cao
								hôm nay
							</p>
						</div>
					</div>
					<div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1">
						{FILTER_TABS.map((tab) => {
							const isActive = activeFilter === tab.id;
							return (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActiveFilter(tab.id)}
									className={`px-3 sm:px-3.5 py-1.5 rounded-full font-label-md text-[11px] sm:text-xs whitespace-nowrap shrink-0 transition-all ${
										isActive
											? 'bg-primary text-white font-semibold shadow-xs'
											: 'bg-white text-on-surface-variant font-medium hover:text-on-surface hover:bg-surface-container border border-outline-variant/50'
									}`}
								>
									{tab.label}
								</button>
							);
						})}
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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