import Link from "next/link";


export default function Logo() {
        return (
                <Link className="p-6 flex items-center gap-4" href="/">
                                                        <div className="relative">
                                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                                                        <span className="text-white font-black text-2xl tracking-tight">M</span>
                                                                </div>
                                                                {/* Decorative dots */}
                                                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-400 rounded-full" />
                                                                <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full" />
                                                        </div>
                
                                                        <div>
                                                                <h1 className="text-2xl font-black tracking-tight">
                                                                        <span className="text-slate-900 dark:text-white">Maginese</span>
                                                                        <span className="text-blue-600 dark:text-blue-400">.vn</span>
                                                                </h1>
                                                                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wider">
                                                                        Chinese for GenZ
                                                                </p>
                                                        </div>
                                                </Link>
                
        )}