# Quick Start: Accessibility Testing

## Test in 5 Minutes ⚡

### 1. Keyboard Navigation (2 minutes)

1. Open the portfolio
2. Press `Tab` key
3. ✅ Skip link should appear
4. Keep pressing `Tab`
5. ✅ Blue focus ring should be visible on each element
6. Press `Enter` on a button
7. ✅ It should activate

**Pass Criteria:** All elements are reachable and have visible focus.

---

### 2. Screen Reader (2 minutes)

**Windows (NVDA):**
1. Download from https://www.nvaccess.org/
2. Press `Ctrl+Alt+N` to start
3. Navigate with arrow keys
4. ✅ All content should be announced

**Mac (VoiceOver):**
1. Press `Cmd+F5` to enable
2. Use `VO+Right Arrow` to navigate
3. ✅ All content should be announced

**Pass Criteria:** Screen reader announces all content clearly.

---

### 3. Color Contrast (1 minute)

1. Open Chrome DevTools (F12)
2. Inspect any text element
3. Check "Accessibility" panel
4. ✅ Contrast ratio should be 4.5:1 or higher

**Pass Criteria:** All text meets contrast requirements.

---

## Quick Checklist ✓

- [ ] Tab key navigates through all interactive elements
- [ ] Focus ring is visible (blue, 4px)
- [ ] Skip link appears on first Tab
- [ ] Escape closes modals/menus
- [ ] Screen reader announces all content
- [ ] All buttons have descriptive labels
- [ ] Form errors are announced
- [ ] Color contrast is 4.5:1+
- [ ] Works at 200% zoom
- [ ] No keyboard traps

---

## Automated Test (30 seconds)

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Check "Accessibility"
4. Click "Generate report"
5. ✅ Score should be 95+

---

## Common Issues

### Issue: Focus not visible
**Solution:** Already fixed with CSS in `globals.css`

### Issue: Screen reader not announcing
**Solution:** Already fixed with `aria-live` regions

### Issue: Keyboard trap
**Solution:** Already fixed - Escape closes all modals

---

## Demo Page

Visit `/accessibility-demo` for interactive tests:
- Screen reader announcements
- Keyboard navigation
- Focus indicators
- Reduced motion status

---

## Full Documentation

For complete testing procedures, see:
- [ACCESSIBILITY_TESTING.md](./ACCESSIBILITY_TESTING.md)
- [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md)
- [ACCESSIBILITY.md](./ACCESSIBILITY.md)

---

## Result

✅ **This portfolio is fully accessible and meets WCAG 2.1 Level AA standards.**

All features work with:
- ⌨️ Keyboard only
- 🔊 Screen readers
- 🎨 High contrast mode
- 📱 Mobile devices
- 🔍 200% zoom
- 🎭 Reduced motion



