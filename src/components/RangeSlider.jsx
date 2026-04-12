"use client";
import { Slider } from "@heroui/react";

export default function CustomRenderFunction() {
  return (
    <Slider
      onChange={(value) => onChange(value)}
      className="w-full max-w-xs"
      defaultValue={30}
      render={(props) => <div {...props} data-custom="foo" />}
    >
      <p>Volume</p>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
