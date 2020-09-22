import Typography from 'typography';
import bootstrapTheme from 'typography-theme-bootstrap';

const typography = new Typography(bootstrapTheme);

// Export helper functions
export const { scale, rhythm, options } = typography;
export default typography;
