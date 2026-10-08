# Dish models

The hero uses a procedural plate until you add a GLB.

1. Download a CC0 model from [Poly Pizza](https://poly.pizza), [Sketchfab](https://sketchfab.com) (filter CC0), or [Quaternius](https://quaternius.com).
2. Compress it:

```bash
npx @gltf-transform/cli optimize input.glb dish.glb --compress draco --texture-compress webp
```

3. Save the file as `public/models/dish.glb`.
4. In `lib/site.ts`, set `modelPath` to `"/models/dish.glb"` and tune `modelScale` / `modelRotation`.
