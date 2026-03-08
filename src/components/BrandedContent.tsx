import React from 'react';

interface BrandedContentProps {
    text?: string;
    className?: string;
    logoClassName?: string;
    invert?: boolean;
}

export const BrandedContent: React.FC<BrandedContentProps> = ({
    text,
    className = "",
    logoClassName = "h-[1em] w-auto inline-block align-middle mb-0.5",
    invert = false
}) => {
    if (!text) return null;

    // Split text by "PawPal" (case insensitive if needed, but the brand is usually specific)
    const parts = text.split(/(PawPal)/g);

    return (
        <span className={className}>
            {parts.map((part, i) => {
                if (part === "PawPal") {
                    return (
                        <img
                            key={i}
                            src="/assets/4Kpawpal.png"
                            alt="PawPal"
                            className={`${logoClassName} ${invert ? 'brightness-0 invert' : ''}`}
                        />
                    );
                }
                return <React.Fragment key={i}>{part}</React.Fragment>;
            })}
        </span>
    );
};
