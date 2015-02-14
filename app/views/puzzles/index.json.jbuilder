json.array!(@puzzles) do |puzzle|
  json.extract! puzzle, :id, :author, :title, :status
  json.url puzzle_url(puzzle, format: :json)
end
