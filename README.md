# P5.js Double Pendulum Simulation

A modular p5.js boilerplate project featuring a double pendulum physics simulation. This project demonstrates advanced p5.js concepts including ES6 modules, scene management, event-driven architecture, and game object patterns.

## Features

- **Modular Architecture**: Clean separation of concerns with core, entities, scenes, and utilities
- **Event System**: Custom event handling for keyboard input and game loop
- **Scene Management**: Flexible scene system for managing different game states
- **Pause/Resume**: Spacebar controls to pause and resume the simulation

## Getting Started

### Prerequisites

- A modern web browser with ES6 module support
- No build tools required - runs directly in the browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ZKitcher/p5js-Boilerplate.git
   cd p5js-Boilerplate
   ```

2. Open `index.html` in your web browser

### Usage

- **Start**: Open `index.html` in a web browser
- **Pause/Resume**: Press the spacebar to pause or resume the simulation
- **Observe**: Watch the double pendulum's chaotic motion and color changes

## Project Structure

```
src/
├── main.js              # Application entry point
├── core/
│   ├── Background.js    # Background rendering
│   ├── events.js        # Event system
│   ├── GameObject.js    # Base game object class
│   ├── loop.js          # Game loop management
│   ├── Scene.js         # Base scene class
│   └── SceneManager.js  # Scene management
├── entities/
│   └── DoublePendulum.js # Double pendulum implementation
├── scenes/
│   └── MainScene.js     # Main simulation scene
└── utility/
    └── keyCode.js       # Keyboard constants
```

## Architecture

This boilerplate implements several design patterns:

- **Observer Pattern**: Event system for decoupling components
- **Component Pattern**: GameObject base class for reusable entities
- **Scene Graph**: Hierarchical scene management
- **Module Pattern**: ES6 modules for clean imports/exports

## Customization

### Adding New Entities

1. Create a new class extending `GameObject` in the `entities/` folder
2. Implement `update()` and `render()` methods
3. Add the entity to a scene in the scene's constructor

### Creating New Scenes

1. Create a new class extending `Scene` in the `scenes/` folder
2. Add entities using `this.add(entity)`
3. Switch scenes using `SceneManager.set(newScene)`

## Dependencies

- [p5.js](https://p5js.org/) v1.9.3 - Creative coding library

## License

This project is part of the p5js-Boilerplate repository. See the original repository for licensing information.

