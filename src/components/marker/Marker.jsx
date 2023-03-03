import { useSpring, animated } from 'react-spring';

const Marker = ({ onClick, children, feature }) => {

    const props = useSpring({
        from: { y: 0 },
        to: { y: 5 },
        config: { mass: 1, tension: 600, friction: 10 },
    });

    const _onClick = () => {
        onClick(feature.properties.description);
    };

    return (
        <animated.button
            onClick={_onClick}
            style={props}
            className="marker"
        >
            {children}
        </animated.button>
    );
};

export default Marker