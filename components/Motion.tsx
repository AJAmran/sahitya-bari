"use client";

import { motion, HTMLMotionProps } from "motion/react";

export const MotionDiv = (props: HTMLMotionProps<"div">) => <motion.div {...props} />;
export const MotionH1 = (props: HTMLMotionProps<"h1">) => <motion.h1 {...props} />;
export const MotionP = (props: HTMLMotionProps<"p">) => <motion.p {...props} />;
export const MotionSection = (props: HTMLMotionProps<"section">) => <motion.section {...props} />;
export const MotionArticle = (props: HTMLMotionProps<"article">) => <motion.article {...props} />;
