type IconProps = {
	color: string;
	pathString: string;
	size?: string | number;
	className?: string;
};

type LogoProps = Omit<IconProps, 'pathString'>;

const Icon = ({
	color,
	size = '24',
	pathString,
	className = '',
}: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		className={className}
	>
		<title>icon</title>
		<path d={pathString} fill={color} />
	</svg>
);

export const PurchLogo = ({ color, size, className = '' }: LogoProps) => (
	<Icon
		color={color}
		size={size}
		pathString="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C8.95467 20 7.94714 19.8385 7 19.541V19C7 17.3949 8.26056 16.0842 9.8457 16.0039L10.3086 15.9922C12.3993 15.8863 14.2061 14.7094 15.1953 13H18L15.9277 10.9277C15.9747 10.6253 16 10.3156 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10V18C1.57131 16.1756 0 13.2715 0 10C0 4.47715 4.47715 0 10 0ZM10 7C11.6569 7 13 8.34315 13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7Z"
		className={className}
	/>
);

export const PurchLogoSquare = ({ color, size }: LogoProps) => (
	<Icon
		color={color}
		size={size}
		pathString="M15 0C17.7614 0 20 2.23858 20 5V15C20 17.7614 17.7614 20 15 20H7V19C7 17.3949 8.26055 16.0842 9.8457 16.0039L10.3086 15.9922C12.3993 15.8863 14.2061 14.7094 15.1953 13H18L15.9277 10.9277C15.9747 10.6253 16 10.3156 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10V19.8994C1.71781 19.4361 0 17.4189 0 15V5C0 2.23858 2.23858 0 5 0H15ZM10 7C11.6569 7 13 8.34315 13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7Z"
	/>
);

export const PurchLogoText = () => (
	<div className="flex items-center h-8 group cursor-pointer w-fit">
		<PurchLogoSquare color="black" size="27" />
		<span className="logo-text font-bold text-xl mb-1 ml-2">Purch</span>
	</div>
);
