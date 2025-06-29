# Cloudflare Pages Deployment with Bun

This project is configured to deploy on Cloudflare Pages using Bun as the package manager and build tool.

## Cloudflare Pages Configuration

### Build Settings

Use these settings in your Cloudflare Pages dashboard:

- **Framework preset**: `None` (or `Vite`)
- **Build command**: `bun install --frozen-lockfile && bun run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty)
- **Node.js version**: `18` or higher

### Environment Variables

If you're using Supabase (optional), add these environment variables in Cloudflare Pages:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note**: The current project works in local mode without Supabase, so these are optional.

## Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Deployment Process

1. **Connect Repository**: Connect your GitHub repository to Cloudflare Pages
2. **Configure Build**: Use the build settings above
3. **Deploy**: Cloudflare will automatically build and deploy on every push to main

## Build Optimization

The project is optimized for Cloudflare Pages with:

- ✅ Bun package manager for faster installs
- ✅ Vite for optimized builds
- ✅ Tree-shaking for smaller bundle sizes
- ✅ Modern ES modules
- ✅ Optimized assets and images
- ✅ Local-first architecture (no external database dependencies)

## Troubleshooting

### Build Fails

1. **Check Node.js version**: Ensure Cloudflare is using Node.js 18+
2. **Verify bun.lockb**: Make sure `bun.lockb` is committed to your repository
3. **Check build command**: Use exactly: `bun install --frozen-lockfile && bun run build`

### Missing Dependencies

If you see missing dependency errors:

```bash
# Regenerate lockfile
rm bun.lockb
bun install
git add bun.lockb
git commit -m "Update bun.lockb"
git push
```

### Performance Issues

The app uses local storage for data management, so it's extremely fast and doesn't require any external services.

## Success Indicators

✅ Build completes without errors
✅ `dist/` folder is generated
✅ Static assets are optimized
✅ Admin dashboard works in local mode
✅ All pages load correctly
✅ No runtime errors in console

Your portfolio should now be successfully deployed on Cloudflare Pages! 🚀