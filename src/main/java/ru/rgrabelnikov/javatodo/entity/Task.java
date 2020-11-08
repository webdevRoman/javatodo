package ru.rgrabelnikov.javatodo.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "task")
@JsonAutoDetect(creatorVisibility = JsonAutoDetect.Visibility.PROTECTED_AND_PUBLIC)
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column
  private String description;
  @Column(name = "is_done")
  private boolean isDone;

  public Task() {}
  public Task(@JsonProperty(value = "description") String description, @JsonProperty(value = "isDone") boolean isDone) {
    this.description = description;
    this.isDone = isDone;
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public boolean isDone() { return isDone; }
  public void setDone(boolean done) {isDone = done; }
}
