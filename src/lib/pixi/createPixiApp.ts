import { Application, Sprite, Texture, type Filter } from "pixi.js";

type CreatePixiAppParams = {
  container: HTMLDivElement;
  video: HTMLVideoElement;
  filters?: Filter[];
};

function coverSprite(
  sprite: Sprite,
  videoWidth: number,
  videoHeight: number,
  screenWidth: number,
  screenHeight: number,
) {
  if (!videoWidth || !videoHeight || !screenWidth || !screenHeight) return;

  const scale = Math.max(screenWidth / videoWidth, screenHeight / videoHeight);

  sprite.width = videoWidth * scale;
  sprite.height = videoHeight * scale;

  sprite.x = (screenWidth - sprite.width) / 2;
  sprite.y = (screenHeight - sprite.height) / 2;
}

export async function createPixiApp({
  container,
  video,
  filters = [],
}: CreatePixiAppParams) {
  const rect = container.getBoundingClientRect();

  const app = new Application();

  await app.init({
    width: container.clientWidth,
    height: container.clientHeight,
    backgroundAlpha: 1,
    background: "#000000",
    antialias: true,
  });

  app.canvas.style.position = "absolute";
  app.canvas.style.inset = "0";
  app.canvas.style.width = "100%";
  app.canvas.style.height = "100%";
  app.canvas.style.display = "block";

  container.appendChild(app.canvas);

  const texture = Texture.from(video);
  const sprite = new Sprite(texture);

  const resize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    app.renderer.resize(width, height);

    coverSprite(sprite, video.videoWidth, video.videoHeight, width, height);

    // console.log("sprite", {
    //   spriteWidth: sprite.width,
    //   spriteHeight: sprite.height,
    //   spriteX: sprite.x,
    //   spriteY: sprite.y,
    //   videoWidth: video.videoWidth,
    //   videoHeight: video.videoHeight,
    //   screenWidth: width,
    //   screenHeight: height,
    // });
  };

  resize();

  sprite.filters = filters;
  app.stage.addChild(sprite);

  const resizeObserver = new ResizeObserver(() => {
    resize();
  });

  resizeObserver.observe(container);

  app.ticker.add((ticker) => {
    texture.update();

    filters.forEach((filter) => {
      const uniforms = filter.resources?.shaderUniforms?.uniforms;

      if (uniforms?.uTime !== undefined) {
        uniforms.uTime += ticker.deltaTime;
      }

      if (uniforms?.uResolution !== undefined) {
        uniforms.uResolution = [app.screen.width, app.screen.height];
      }
    });

    resize();
  });

  return {
    app,
    sprite,
    texture,
    destroy: () => {
      resizeObserver.disconnect();
      app.destroy(true);
    },
  };
}
