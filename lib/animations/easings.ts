import { cubicBezier } from 'framer-motion';

export const easeInOutCurve = cubicBezier(0.42, 0, 0.58, 1);
export const easeOutCurve = cubicBezier(0, 0, 0.58, 1);
export const linearCurve = cubicBezier(0, 0, 1, 1);
export const circOutCurve = cubicBezier(0, 0.55, 0.45, 1);
