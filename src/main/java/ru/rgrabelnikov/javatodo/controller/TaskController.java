package ru.rgrabelnikov.javatodo.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.rgrabelnikov.javatodo.entity.Task;
import ru.rgrabelnikov.javatodo.repository.TaskRepository;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/task")
public class TaskController {
  @Autowired
  private TaskRepository taskRepository;

  @GetMapping
  public List<Task> getTasks() { return taskRepository.findAll(); }
  @PostMapping
  public Task addTask(@RequestBody Task task) { return taskRepository.save(task); }
  @PutMapping("/check")
  public boolean checkAllTasks() {
    taskRepository.checkAll(true);
    return true;
  }
  @PutMapping("/uncheck")
  public boolean uncheckAllTasks() {
    taskRepository.checkAll(false);
    return true;
  }
  @PutMapping("{id}")
  public Task updateTask(@RequestBody Task task, @PathVariable Long id) {
    return taskRepository.findById(id).map(taskFromDb -> {
      BeanUtils.copyProperties(task, taskFromDb, "id");
      return taskRepository.save(taskFromDb);
    }).orElse(null);
  }
  @DeleteMapping("/checked")
  public boolean deleteCheckedTasks() {
    taskRepository.deleteChecked();
    return true;
  }
  @DeleteMapping("{id}")
  public boolean deleteTask(@PathVariable Long id) {
    if (taskRepository.findById(id).isPresent()) {
      taskRepository.deleteById(id);
      return true;
    }
    return false;
  }
}
