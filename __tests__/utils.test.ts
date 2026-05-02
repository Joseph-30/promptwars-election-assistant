import { cn } from '../src/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('should merge tailwind classes correctly', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    });

    it('should resolve conflicts using tailwind-merge', () => {
      expect(cn('px-2 py-1 bg-red-500', 'p-3 bg-blue-500')).toBe('p-3 bg-blue-500');
    });

    it('should handle conditional classes via clsx', () => {
      const isTrue = true;
      const isFalse = false;
      expect(cn('base-class', isTrue && 'true-class', isFalse && 'false-class')).toBe('base-class true-class');
    });
  });
});
