import vtk

def main(argv):

  colors = vtk.vtkNamedColors()

  # Cone
  cone = vtk.vtkConeSource()
  cone.SetRadius(0.8)
  cone.SetHeight(1)
  cone.SetDirection(0,1,0)
  cone.SetResolution(80)
  cone.Update()

  # Cube
  cube = vtk.vtkCubeSource()
  cube.SetXLength(1)
  cube.SetYLength(1)
  cube.SetZLength(1)
  cube.Update()

  # Window
  window = vtk.vtkCubeSource()
  window.SetXLength(0.05)
  window.SetYLength(0.45)
  window.SetZLength(0.45)
  window.Update()

  # Door
  door = vtk.vtkCubeSource()
  door.SetXLength(0.35)
  door.SetYLength(0.5)
  door.SetZLength(0.05)
  door.Update()

  # Chapa
  chapa = vtk.vtkSphereSource()
  chapa.SetRadius(0.05)
  chapa.Update()

  # Cone Mapper
  mapper1 = vtk.vtkPolyDataMapper()
  mapper1.SetInputData(cone.GetOutput())

  # Cube Mapper
  mapper2 = vtk.vtkPolyDataMapper()
  mapper2.SetInputData(cube.GetOutput())

  # Window Mapper
  mapper3 = vtk.vtkPolyDataMapper()
  mapper3.SetInputData(window.GetOutput())

  # Door Mapper
  mapper4 = vtk.vtkPolyDataMapper()
  mapper4.SetInputData(door.GetOutput())

  # Chapa Mapper
  mapper5 = vtk.vtkPolyDataMapper()
  mapper5.SetInputData(chapa.GetOutput())

  # Cone Actor
  actor1 = vtk.vtkActor()
  actor1.SetMapper(mapper1)
  actor1.GetProperty().SetColor(colors.GetColor3d('red'))
  actor1.SetPosition(0.5,0.9,0.5)

  # Cube Actor
  actor2 = vtk.vtkActor()
  actor2.SetMapper(mapper2)
  actor2.GetProperty().SetColor(colors.GetColor3d('cadmium_yellow_light'))
  actor2.SetPosition(0.5,0,0.5)

  # Window Actor
  actor3 = vtk.vtkActor()
  actor3.SetMapper(mapper3)
  actor3.GetProperty().SetColor(colors.GetColor3d('MistyRose'))
  actor3.SetPosition(-0.05,0,0.5)

  # Door Actor
  actor4 = vtk.vtkActor()
  actor4.SetMapper(mapper4)
  actor4.GetProperty().SetColor(colors.GetColor3d('Brown'))
  actor4.SetPosition(0.5,-0.25,1.03)

  # Chapa Actor
  actor5 = vtk.vtkActor()
  actor5.SetMapper(mapper5)
  actor5.GetProperty().SetColor(colors.GetColor3d('blue'))
  actor5.SetPosition(0.5,-0.25,1.1)

  #axes
  transform = vtk.vtkTransform()
  transform.Translate(-0.05, 0.0, 0.0) 
  axes = vtk.vtkAxesActor()
  axes.SetUserTransform(transform)

  renderer = vtk.vtkRenderer()
  renderer.SetBackground(colors.GetColor3d("black"))
  renderer.AddActor(actor1)
  renderer.AddActor(actor2)
  renderer.AddActor(actor3)
  renderer.AddActor(actor4)
  renderer.AddActor(actor5)
  renderer.AddActor(axes)

  renWin = vtk.vtkRenderWindow()
  renWin.SetSize(1000,1000)
  renWin.AddRenderer(renderer)
  renWin.SetWindowName('Casita')

  #interactor
  interactor = vtk.vtkRenderWindowInteractor()
  interactor.SetRenderWindow(renWin)

  # Initialize the interactor and start the rendering loop
  interactor.Initialize()
  renWin.Render()
  renderer.GetActiveCamera().Azimuth(-35)
  interactor.Start()

if __name__ == '__main__':
    import sys

    main(sys.argv)
