import { fileToBase64, base64ToFile, base64ToBlob } from '../';

const createTestFile = (
  content: string,
  filename: string,
  mimeType: string,
): File => {
  const blob = new Blob([content], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};

describe('file utils', () => {
  describe('fileToBase64 function', () => {
    test('should convert a file to a base64 string', async () => {
      const file = createTestFile('Hello, world!', 'test.txt', 'text/plain');
      const base64 = await fileToBase64(file);
      expect(base64).toMatch(/^data:text\/plain;base64,/);
    });

    test('should reject if the file cannot be read', async () => {
      const file = createTestFile('Hello, world!', 'test.txt', 'text/plain');

      // Mocking FileReader to trigger an error
      const originalFileReader = global.FileReader;
      global.FileReader = class {
        onerror: (error: any) => void = () => {};
        readAsDataURL() {
          this.onerror(new Error('Mock error'));
        }
      } as any;

      await expect(fileToBase64(file)).rejects.toThrow('Mock error');

      // Restore the mock
      global.FileReader = originalFileReader;
    });
  });

  describe('base64ToFile', () => {
    test('should convert a base64 string to a File object', () => {
      // Base64 for 'Hello, world!'
      const base64 = 'data:text/plain;base64,SGVsbG8sIHdvcmxkIQ==';
      const file = base64ToFile(base64, 'test.txt', 'text/plain');
      expect(file).toBeInstanceOf(File);
      expect(file.name).toBe('test.txt');
      expect(file.type).toBe('text/plain');
    });
  });

  describe('base64ToBlob', () => {
    it('should convert a base64 string to a Blob object', () => {
      const base64 = 'data:text/plain;base64,SGVsbG8sIHdvcmxkIQ==';
      const blob = base64ToBlob(base64, 'text/plain');
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/plain');
    });
  });
});
