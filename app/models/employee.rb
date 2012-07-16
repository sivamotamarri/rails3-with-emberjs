class Employee < ActiveRecord::Base
  attr_writer :current_step
  validates :first_name,:last_name,:city,:age, :presence => true , :if => lambda { |o| o.current_step == "firstStep" }
  validates :age, :numericality => { :only_integer => true ,:greater_than => 0, :less_than_or_equal_to => 100} , :if => lambda { |o| o.current_step == "firstStep" }

  validates :education_level,:university, :presence => true , :if => lambda { |o| o.current_step == "secondStep" }
  validates :work_experience,:skills, :presence => true , :if => lambda { |o| o.current_step == "thirdStep" }



  validate :education_level_value , :if => lambda { |o| o.current_step == "secondStep" }
  validate :work_experience_value, :if => lambda { |o| o.current_step == "thirdStep" }

  def education_level_value
    if education_level.blank? || education_level == "null"
      errors.add(:education_level, "can't be blank")
    end
  end

  def work_experience_value
    if work_experience.blank? || work_experience == "null"
      errors.add(:work_experience, "can't be blank")
    end
  end

  def current_step
    @current_step || steps.first
  end

  def steps
    %w[firstStep secondStep thirdStep]
  end

  def next_step
    self.current_step = steps[steps.index(current_step)+1]
  end

  def previous_step
    self.current_step = steps[steps.index(current_step)-1]
  end

  def first_step?
    current_step == steps.first
  end

  def last_step?
    current_step == steps.last
  end

  def all_valid?
    steps.all? do |step|
      self.current_step = step
      valid?
    end
  end
end
