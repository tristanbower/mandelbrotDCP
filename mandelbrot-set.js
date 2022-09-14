/**
 * Determines how many iterations of the function fc(z) before the point escapes
 * @param {int} z
 * @param {int} max_iterations
 * @returns k
 */

function calculate_escape_time(z, max_iterations) {
  c = z;
  var k = 0;
  while (k < max_iterations) {
    real = z.re * z.re - z.im * z.im + c.re;
    imaginary = 2 * z.re * z.im + c.im;
    z = { re: real, im: imaginary };

    if (z.re * z.re + z.im * z.im >= 4) {
      break;
    }
    k++;
  }
  return k;
}
