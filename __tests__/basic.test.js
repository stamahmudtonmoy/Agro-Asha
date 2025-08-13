describe('Basic Test Suite', () => {
  test('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should handle strings', () => {
    expect('hello').toBe('hello');
  });

  test('should handle arrays', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });
});
