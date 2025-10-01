import React from 'react';

// Mock for SVG files imported with ?react parameter
const SvgrMock = React.forwardRef((props, ref) => <span ref={ref} {...props} />);

// Export both default and named exports to handle different import styles
export const ReactComponent = SvgrMock;
export default SvgrMock;
