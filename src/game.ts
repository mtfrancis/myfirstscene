import { getUserData } from "@decentraland/Identity"
import { getConnectedPlayers } from "@decentraland/Players"

/// --- Set up a system ---

const camera = Camera.instance

class RotatorSystem {

  private updateFrequency: number = 90;
  private updateCounter: number = 0;


  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)

  update(dt: number) {
    // iterate over the entities of the group

    this.updateCounter  = this.updateCounter + 1


    if (this.updateCounter % this.updateFrequency === 0) {
      log("update ", this.updateCounter, "-", Date())
      log(camera)
    } 
    onPlayerConnectedObservable.add((player) => {
      log("player entered: ", player.userId)
    })
    
    onPlayerDisconnectedObservable.add((player) => {
      log("player left: ", player.userId)
    })
    
    getConnectedPlayers().then((players) => {
      players.forEach((player) => {
        log("player was already here: ", player.userId)
      })
    })

    for (let entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 10)
    }
  }
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

/// --- Spawner function ---

function spawnBillboard(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))

  // add a shape to the entity
  cube.addComponent(new ConeShape())


  // add the entity to the engine
  engine.addEntity(cube)

  return cube
}

/// --- Spawn a cube ---

const cube = spawnTZET(1, 1, 1)

// cube.addComponent(
//   new OnClick(() => {
//     cube.getComponent(Transform).scale.z *= 1.1
//     cube.getComponent(Transform).scale.x *= 0.9

//     spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
//   })
// )


