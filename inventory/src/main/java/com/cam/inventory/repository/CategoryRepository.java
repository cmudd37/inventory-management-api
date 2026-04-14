package com.cam.inventory.repository;

import com.cam.inventory.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends JpaRepository<Category,Long> {
}
