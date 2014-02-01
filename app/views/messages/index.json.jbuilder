json.array!(@messages) do |message|
  json.extract! message, :status, :id, :from, :subject, :text, :created_at
  json.url message_url(message, format: :json)
end
