

// declare global {
//   interface Window {
//     example: string;
//   }
// }

declare global {
  interface Window {
    recaptchaVerifier: any;  // Keep this if you need to declare the verifier globally
    recaptchaWidgetId?: number;  // Marked as optional and of type number
  }
}

export {};
