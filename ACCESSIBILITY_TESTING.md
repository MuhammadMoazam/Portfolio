# Accessibility Testing Guide

## Quick Start Testing

### 1. Keyboard Navigation Test (5 minutes)

**Steps:**
1. Open the portfolio in your browser
2. Press `Tab` key repeatedly
3. Verify you can reach all interactive elements
4. Check that focus indicators are visible
5. Press `Shift+Tab` to navigate backwards
6. Press `Enter` or `Space` on buttons/links to activate
7. Press `Escape` to close modals/menus

**Expected Results:**
- ✅ Skip link appears on first Tab press
- ✅ All buttons, links, and form fields are reachable
- ✅ Focus ring is clearly visible (blue ring with offset)
- ✅ Tab order follows visual layout
- ✅ No keyboard traps
- ✅ Modals close with Escape key

### 2. Screen Reader Test (10 minutes)

**Windows (NVDA - Free):**
1. Download NVDA from https://www.nvaccess.org/
2. Install and launch NVDA
3. Navigate to the portfolio
4. Use arrow keys to read content
5. Use `Tab` to navigate interactive elements
6. Use `H` to jump between headings
7. Use `L` to navigate links
8. Use `F` to navigate form fields

**macOS (VoiceOver - Built-in):**
1. Press `Cmd+F5` to enable VoiceOver
2. Navigate to the portfolio
3. Use `VO+Right Arrow` to move forward
4. Use `VO+Left Arrow` to move backward
5. Use `VO+Space` to activate elements
6. Use `VO+H` to navigate headings

**Expected Results:**
- ✅ All text content is announced
- ✅ Images have descriptive alt text
- ✅ Buttons announce their purpose
- ✅ Form fields announce labels and errors
- ✅ Dynamic content changes are announced
- ✅ Navigation structure is clear

### 3. Color Contrast Test (3 minutes)

**Using Browser DevTools:**
1. Open Chrome/Edge DevTools (F12)
2. Open Elements panel
3. Select text element
4. Check "Accessibility" pane
5. Look for contrast ratio

**Using Online Tool:**
1. Visit https://webaim.org/resources/contrastchecker/
2. Enter foreground and background colors
3. Check if ratio meets WCAG AA (4.5:1 for normal text)

**Expected Results:**
- ✅ Normal text: 4.5:1 or higher
- ✅ Large text (18pt+): 3:1 or higher
- ✅ UI components: 3:1 or higher

### 4. Reduced Motion Test (2 minutes)

**Windows:**
1. Settings > Ease of Access > Display
2. Turn ON "Show animations in Windows"
3. Reload portfolio
4. Verify animations are minimal/instant

**macOS:**
1. System Preferences > Accessibility > Display
2. Check "Reduce motion"
3. Reload portfolio
4. Verify animations are minimal/instant

**Expected Results:**
- ✅ Animations are instant (no movement)
- ✅ Transitions are minimal
- ✅ Content is still accessible
- ✅ No layout shift

### 5. Zoom Test (2 minutes)

**Steps:**
1. Press `Ctrl+` (or `Cmd+` on Mac) to zoom in
2. Zoom to 200%
3. Navigate the entire page
4. Check that nothing breaks

**Expected Results:**
- ✅ Text reflows properly
- ✅ No horizontal scrolling
- ✅ All content remains readable
- ✅ Interactive elements still work

## Automated Testing Tools

### 1. Lighthouse (Built into Chrome)

**Steps:**
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Accessibility" category
4. Click "Generate report"

**Target Score:** 95+ / 100

### 2. axe DevTools (Browser Extension)

**Installation:**
- Chrome: https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/

**Steps:**
1. Install extension
2. Open DevTools
3. Go to "axe DevTools" tab
4. Click "Scan ALL of my page"
5. Review issues

**Target:** 0 critical issues, 0 serious issues

### 3. WAVE (Web Accessibility Evaluation Tool)

**Online Tool:**
- Visit: https://wave.webaim.org/
- Enter portfolio URL
- Review report

**Target:** 0 errors, minimal alerts

## Detailed Testing Checklist

### Perceivable

- [ ] All images have alt text
- [ ] Decorative images have empty alt (`alt=""`)
- [ ] Color is not the only means of conveying information
- [ ] Text has sufficient contrast (4.5:1 minimum)
- [ ] Content is structured with proper headings (h1, h2, h3)
- [ ] Audio/video has captions (if applicable)

### Operable

- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Skip link to main content works
- [ ] Focus indicators are visible
- [ ] No time limits on interactions
- [ ] Animations can be paused/disabled
- [ ] Page has descriptive title
- [ ] Links have descriptive text (not "click here")

### Understandable

- [ ] Page language is set (lang="en")
- [ ] Navigation is consistent
- [ ] Forms have clear labels
- [ ] Form errors are clearly identified
- [ ] Form errors provide suggestions
- [ ] Instructions are clear
- [ ] Unexpected changes don't occur on focus

### Robust

- [ ] Valid HTML (no errors)
- [ ] ARIA attributes used correctly
- [ ] Works with screen readers
- [ ] Works on mobile devices
- [ ] Works in different browsers
- [ ] Works with browser extensions disabled

## Browser Testing Matrix

Test in multiple browsers:

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ |
| Firefox | Latest | ✅ |
| Safari | Latest | ✅ |
| Edge | Latest | ✅ |
| Mobile Safari | iOS 15+ | ✅ |
| Chrome Mobile | Android 10+ | ✅ |

## Screen Reader Testing Matrix

| Screen Reader | Browser | OS | Status |
|---------------|---------|-----|--------|
| NVDA | Firefox/Chrome | Windows | ✅ |
| JAWS | Chrome | Windows | ✅ |
| VoiceOver | Safari | macOS | ✅ |
| VoiceOver | Safari | iOS | ✅ |
| TalkBack | Chrome | Android | ✅ |

## Common Issues and Fixes

### Issue: Focus not visible
**Fix:** Ensure `:focus-visible` styles are applied in `globals.css`

### Issue: Screen reader not announcing changes
**Fix:** Use `aria-live` regions or `useAnnounce` hook

### Issue: Keyboard trap in modal
**Fix:** Implement focus trap with return focus on close

### Issue: Low contrast
**Fix:** Adjust colors in `tailwind.config.ts` or `globals.css`

### Issue: Animations causing motion sickness
**Fix:** Ensure `prefers-reduced-motion` is respected in all animations

## Reporting Issues

When reporting accessibility issues, include:

1. **Issue Type:** Keyboard, Screen Reader, Visual, etc.
2. **Severity:** Critical, Serious, Moderate, Minor
3. **WCAG Criterion:** e.g., 2.1.1 Keyboard
4. **Steps to Reproduce:** Clear steps
5. **Expected Behavior:** What should happen
6. **Actual Behavior:** What actually happens
7. **Browser/OS:** Version information
8. **Screenshots:** If applicable

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)

## Continuous Testing

**Before Each Release:**
1. Run Lighthouse audit
2. Run axe DevTools scan
3. Test keyboard navigation
4. Test with screen reader
5. Check color contrast
6. Test reduced motion
7. Test at 200% zoom

**Monthly:**
1. Full manual accessibility audit
2. Test with multiple screen readers
3. Test on mobile devices
4. Review and update this guide

## Success Criteria

The portfolio is considered accessible when:

- ✅ Lighthouse Accessibility score: 95+
- ✅ axe DevTools: 0 critical/serious issues
- ✅ WAVE: 0 errors
- ✅ All keyboard tests pass
- ✅ Screen reader tests pass
- ✅ Color contrast meets WCAG AA
- ✅ Reduced motion is respected
- ✅ Works at 200% zoom
- ✅ No user complaints about accessibility



