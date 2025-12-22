import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '1rem',
  			md: '1rem',
  			lg: '3.75rem',
  			xl: '3.75rem',
  			'2xl': '3.75rem'
  		},
  		screens: {
  			sm: '600px',
  			md: '840px',
  			lg: '1200px',
  			xl: '1600px',
  			'2xl': '1920px'
  		}
  	},
  	screens: {
  		sm: '600px',
  		md: '840px',
  		lg: '1200px',
  		xl: '1600px',
  		'2xl': '1920px'
  	},
  	extend: {
  		spacing: {
  			'layout-margin-compact': '1rem',
  			'layout-margin-expanded': '3.75rem',
  			'layout-gutter': '1.5rem'
  		},
		colors: {
			border: {
				DEFAULT: 'hsl(var(--border))',
				strong: 'hsl(var(--border-strong))',
				dark: 'hsl(var(--border-dark))'
			},
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			background: {
				DEFAULT: 'hsl(var(--background))',
				body: 'hsl(var(--background-body))'
			},
			foreground: {
				DEFAULT: 'hsl(var(--foreground))',
				secondary: 'hsl(var(--foreground-secondary))',
				disabled: 'hsl(var(--foreground-disabled))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))',
				hover: 'hsl(var(--primary-hover))',
				'tint-4': 'hsl(var(--primary-tint-4))',
				'tint-3': 'hsl(var(--primary-tint-3))',
				'tint-50': 'hsl(var(--primary-tint-50))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			sidebar: {
				DEFAULT: 'hsl(var(--sidebar-background))',
				foreground: 'hsl(var(--sidebar-foreground))',
				primary: 'hsl(var(--sidebar-primary))',
				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
				accent: 'hsl(var(--sidebar-accent))',
				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
				border: 'hsl(var(--sidebar-border))',
				ring: 'hsl(var(--sidebar-ring))'
			},
			success: {
				DEFAULT: 'hsl(var(--success))',
				foreground: 'hsl(var(--success-foreground))',
				subdued: 'hsl(var(--success-subdued))'
			},
			warning: {
				DEFAULT: 'hsl(var(--warning))',
				foreground: 'hsl(var(--warning-foreground))',
				subdued: 'hsl(var(--warning-subdued))'
			},
			error: {
				DEFAULT: 'hsl(var(--error))',
				foreground: 'hsl(var(--error-foreground))',
				subdued: 'hsl(var(--error-subdued))'
			},
			info: {
				DEFAULT: 'hsl(var(--info))',
				foreground: 'hsl(var(--info-foreground))',
				subdued: 'hsl(var(--info-subdued))'
			},
			icon: {
				soft: 'hsl(var(--icon-soft))',
				hard: 'hsl(var(--icon-hard))'
			},
			status: {
				empty: 'hsl(var(--status-empty))',
				partial: 'hsl(var(--status-partial))',
				complete: 'hsl(var(--status-complete))'
			},
			'high-impact': {
				DEFAULT: 'hsl(var(--badge-high-impact))',
				foreground: 'hsl(var(--badge-high-impact-foreground))'
			},
			data: {
				orange: 'hsl(var(--data-orange))',
				green: 'hsl(var(--data-green))',
				amber: 'hsl(var(--data-amber))',
				teal: 'hsl(var(--data-teal))',
				blue: 'hsl(var(--data-blue))',
				grey: 'hsl(var(--data-grey))',
				'forest-green': 'hsl(var(--data-forest-green))',
				'deep-violet': 'hsl(var(--data-deep-violet))',
				'soft-orange': 'hsl(var(--data-soft-orange))',
				sand: 'hsl(var(--data-sand))',
				rose: 'hsl(var(--data-rose))',
				'blue-dark': 'hsl(var(--data-blue-dark))',
				'misty-blue': 'hsl(var(--data-misty-blue))',
				'smoky-blue': 'hsl(var(--data-smoky-blue))',
				turquoise: 'hsl(var(--data-turquoise))'
			}
		},
  		gap: {
  			'gutter': '1.5rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			serif: [
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
