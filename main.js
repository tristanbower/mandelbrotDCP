#! /usr/bin/env node

const mondelbrot = require("./mandelbrot-set.js");

const create_image = require("./image-animation.js");

const SCHEDULER_URL = new URL("https://scheduler.distributed.computer");

function set_up() {
  let complex_coordinates = {
    x1: -2.5,
    y1: -1,
    x2: 1,
    y2: 1,
  };
  const canvas_size = {
    height: 400,
    width: 600,
  };
  const z0 = { re: 0.42884, im: -0.231345 };
  const speed = 0.4;
  const max_iterations = 1000;
  const frames_num = 10;
  const frames_per_worker = 2;

  let complex_coordinates_new;
  let pre_frames = new Array(frames_num);
  for (let i = 0; i < frames_num; i++) {
    complex_coordinates_new = mandelbrot.zoom_in(
      complex_coordinates,
      z0,
      speed
    );
    pre_frames[i] = [complex_coordinates, complex_coordinates_new];
    complex_coordinates = complex_coordinates_new;
  }
  return {
    canvas_size: canvas_size,
    max_iterations: max_iterations,
    frames_per_worker: frames_per_worker,
    pre_frames: pre_frames,
  };
}
