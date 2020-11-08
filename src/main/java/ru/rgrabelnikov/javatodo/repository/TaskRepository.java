package ru.rgrabelnikov.javatodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.rgrabelnikov.javatodo.entity.Task;

import javax.transaction.Transactional;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
  Optional<Task> findById(Long id);
  @Modifying
  @Transactional
  @Query(value = "update task set is_done =:done", nativeQuery = true)
  void checkAll(@Param("done") boolean done);
  @Modifying
  @Transactional
  @Query(value = "delete from task where is_done = true", nativeQuery = true)
  void deleteChecked();
}
