"use client";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        sunnyYellow: { value: "#FFEEC8" },
        darkYellow: { value: "#F7D07A" },
        skyBlue: { value: "#97BDFF" },
      },
    },
  },
})

export default system;